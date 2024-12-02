/** 
* USERS
* Note: This table contains user data. Users should only be able to view and update their own data.
*/
CREATE TABLE users (
  -- UUID from auth.users
  id uuid references auth.users(id) not null primary key,
  name text,
  email text,
  email_verified timestamp with time zone,
  image text,
  created_at timestamp with time zone, 
  updated_at timestamp with time zone,
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_price_id text,
  stripe_current_period_end timestamp with time zone
);

alter table users add constraint unique_email unique (email);
alter table users add constraint unique_stripe_customer_id unique (stripe_customer_id);
alter table users add constraint unique_stripe_subscription_id unique (stripe_subscription_id);

alter table users enable row level security;
create policy "Users can view own user data" on users for select using (auth.uid() = id);
create policy "Users can update own user data" on users for update using (auth.uid() = id);


/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/ 
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, email, name, image, created_at)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.created_at);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/ 
create function public.update_public_user_info()
returns trigger as $$
begin
  update public.users 
  set email_verified = new.email_confirmed_at, updated_at = new.updated_at, name = new.raw_user_meta_data->>'full_name'
  where id = new.id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.update_public_user_info();


/** 
* workout_plans
* Note: This table contains an user workout_plans. Users should only be able to view and update their own data.
*/
CREATE TABLE "public"."workout_plans" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
  name TEXT NOT NULL,
  user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE "public"."workout_plans" ENABLE ROW LEVEL SECURITY;

-- Create policies for workout_plans
CREATE POLICY "Select own workout plans" ON "public"."workout_plans"
FOR SELECT USING (user_id = auth.uid ());

CREATE POLICY "Insert own workout plans" ON "public"."workout_plans"
FOR INSERT WITH CHECK (user_id = auth.uid ());

CREATE POLICY "Update own workout plans" ON "public"."workout_plans"
FOR UPDATE USING (user_id = auth.uid ());

CREATE POLICY "Delete own workout plans" ON "public"."workout_plans"
FOR DELETE USING (user_id = auth.uid ());

/** 
* workouts
* Note: This table contains an user workouts. Users should only be able to view and update their own data.
*/
CREATE TABLE "public"."workouts" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
  workout_plan_id UUID REFERENCES workout_plans (id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  detailed TEXT,
  repetitions INT,
  level TEXT CHECK (level IN ('Iniciante', 'Intermediário', 'Avançado')),
  time TEXT,
  user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE "public"."workouts" ENABLE ROW LEVEL SECURITY;

-- Create policies for workouts
CREATE POLICY "Select own workouts" ON "public"."workouts"
FOR SELECT USING (user_id = auth.uid ());

CREATE POLICY "Insert own workouts" ON "public"."workouts"
FOR INSERT WITH CHECK (user_id = auth.uid ());

CREATE POLICY "Update own workouts" ON "public"."workouts"
FOR UPDATE USING (user_id = auth.uid ());

CREATE POLICY "Delete own workouts" ON "public"."workouts"
FOR DELETE USING (user_id = auth.uid ());