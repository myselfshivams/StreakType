// utils/supabase/middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: Request) {


  return NextResponse.next();
}
