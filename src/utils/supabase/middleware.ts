// utils/supabase/middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: Request) {

  console.log('Middleware invoked');
  return NextResponse.next();
}
