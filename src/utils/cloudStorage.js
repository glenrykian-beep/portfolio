import { supabase, isSupabaseConfigured } from './supabaseClient';

const BIN_ID_KEY = 'portfolio_cloud_bin_id';
const LOCAL_CACHE_KEY = 'portfolio_unified_bundle';

// Upload image to Supabase Storage if configured, otherwise return dataURL
export async function uploadPortfolioImage(file, pathPrefix = 'images') {
  if (!file) return null;

  if (isSupabaseConfigured && supabase) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${pathPrefix}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('portfolio-uploads')
        .upload(fileName, file, { cacheControl: '3600', upsert: true });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('portfolio-uploads')
        .getPublicUrl(fileName);

      if (publicUrlData && publicUrlData.publicUrl) {
        // Append cache-busting timestamp query parameter
        return `${publicUrlData.publicUrl}?v=${Date.now()}`;
      }
    } catch (err) {
      console.error('Supabase storage upload error, falling back to base64:', err);
    }
  }

  // Fallback: read as Data URL (base64)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

// Fetch portfolio data from Supabase or fallback (npoint / localStorage)
export async function fetchCloudPortfolio() {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('portfolio_data')
        .select('data')
        .eq('id', 'main')
        .single();

      if (!error && data && data.data) {
        return data.data;
      }
    }

    // Fallback to npoint.io bin
    const binId = localStorage.getItem(BIN_ID_KEY);
    if (binId) {
      const response = await fetch(`https://api.npoint.io/${binId}`);
      if (response.ok) {
        const bundle = await response.json();
        return bundle;
      }
    }

    // Local storage cache fallback
    const cached = localStorage.getItem(LOCAL_CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }

    return null;
  } catch (error) {
    console.warn('Error fetching cloud portfolio:', error);
    const cached = localStorage.getItem(LOCAL_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  }
}

// Save/Publish portfolio data to Supabase and fallback
export async function saveCloudPortfolio(portfolioData) {
  try {
    // Always store in local cache
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(portfolioData));

    let savedToSupabase = false;

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('portfolio_data')
        .upsert({ id: 'main', data: portfolioData, updated_at: new Date().toISOString() });

      if (!error) {
        savedToSupabase = true;
      } else {
        console.error('Supabase save error:', error);
      }
    }

    // Also sync to npoint.io bin as secondary cloud backup
    let binId = localStorage.getItem(BIN_ID_KEY);
    if (!binId) {
      try {
        const createRes = await fetch('https://api.npoint.io', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(portfolioData),
        });
        if (createRes.ok) {
          const createData = await createRes.json();
          binId = createData.id || createData.binId;
          if (binId) localStorage.setItem(BIN_ID_KEY, binId);
        }
      } catch (e) {}
    } else {
      try {
        await fetch(`https://api.npoint.io/${binId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(portfolioData),
        });
      } catch (e) {}
    }

    return savedToSupabase || Boolean(binId);
  } catch (error) {
    console.error('Error in saveCloudPortfolio:', error);
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(portfolioData));
    return false;
  }
}

// Trigger cloud sync bundle
export async function triggerCloudSync() {
  try {
    const content = JSON.parse(localStorage.getItem('portfolio_content') || '{}');
    const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
    const certifications = JSON.parse(localStorage.getItem('portfolio_certifications') || '[]');

    const bundle = {
      content,
      projects,
      certifications,
      updatedAt: new Date().toISOString(),
    };

    return await saveCloudPortfolio(bundle);
  } catch (e) {
    console.error('Error triggering cloud sync:', e);
    return false;
  }
}
