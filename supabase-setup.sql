-- Create portfolio_data table for storing all portfolio content
create table if not exists portfolio_data (
  id text primary key,
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table portfolio_data enable row level security;

-- Allow public read access (so visitors can see the portfolio)
create policy "Allow public read access"
  on portfolio_data
  for select
  using (true);

-- Allow public insert/upsert (for admin publishing from frontend)
create policy "Allow public insert"
  on portfolio_data
  for insert
  with check (true);

-- Allow public update (for admin publishing from frontend)
create policy "Allow public update"
  on portfolio_data
  for update
  using (true);

-- Create index for faster queries
create index if not exists portfolio_data_updated_at_idx on portfolio_data(updated_at desc);

-- Insert initial empty record
insert into portfolio_data (id, data, updated_at)
values ('main', '{}'::jsonb, now())
on conflict (id) do nothing;
