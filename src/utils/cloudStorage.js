// Cloud storage utility using npoint.io (zero-config, free cloud JSON bin)
// Syncs portfolio content, projects, and certifications across devices, browsers, and incognito modes.

const BIN_ID_KEY = 'portfolio_cloud_bin_id';
const LOCAL_CACHE_KEY = 'portfolio_unified_bundle';

export async function fetchCloudPortfolio() {
  try {
    const binId = localStorage.getItem(BIN_ID_KEY);
    if (!binId) return null;

    const response = await fetch(`https://api.npoint.io/${binId}`);
    if (!response.ok) {
      throw new Error(`Cloud fetch failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Could not fetch from cloud storage (using local fallback):', error);
    return null;
  }
}

export async function saveCloudPortfolio(portfolioData) {
  try {
    // Always save to local cache first
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(portfolioData));

    let binId = localStorage.getItem(BIN_ID_KEY);

    if (!binId) {
      // Create a new bin on npoint.io
      const createRes = await fetch('https://api.npoint.io', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      });

      if (!createRes.ok) {
        throw new Error(`Failed to create cloud bin: ${createRes.status}`);
      }

      const createData = await createRes.json();
      binId = createData.id || createData.binId;
      if (binId) {
        localStorage.setItem(BIN_ID_KEY, binId);
      }
    } else {
      // Update existing bin
      const updateRes = await fetch(`https://api.npoint.io/${binId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      });

      if (!updateRes.ok) {
        // If update fails, create a new bin
        const createRes = await fetch('https://api.npoint.io', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(portfolioData),
        });
        if (createRes.ok) {
          const createData = await createRes.json();
          binId = createData.id || createData.binId;
          if (binId) {
            localStorage.setItem(BIN_ID_KEY, binId);
          }
        }
      }
    }
    return true;
  } catch (error) {
    console.error('Error saving portfolio to cloud:', error);
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(portfolioData));
    return false;
  }
}

// Helper to bundle all local storage items and sync to cloud
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
