#!/usr/bin/env node 

export default {
  async fetch(request, env, ctx) {
  
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent') || '';
    const pathname = url.pathname;

    if (userAgent.includes('HTTrack') || 
        userAgent.includes('WebCopier') || 
        userAgent.includes('Teleport') ||
        userAgent.includes('Webripper') ||
        userAgent.includes('Offline') ||
        userAgent.includes('Downloader')) {
        return new Response('Access Denied', { status: 403 });
    }

    if (!userAgent.includes('Mozilla') || 
        !(userAgent.includes('Chrome') || 
        userAgent.includes('Firefox') ||   
        userAgent.includes('Safari') ||
        userAgent.includes('Edge') ||
        userAgent.includes('Opera') ||
        userAgent.includes('Brave'))) {
        return new Response('Access Denied', { status: 403 });
    }

    if (pathname !== '/access' && pathname !== '/acces') {
        return new Response('Access Denied!', { status: 403 });
    }

    return env.ASSETS.fetch(request);
  }
}