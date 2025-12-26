# Troubleshooting Plesk Deployment

If you encounter issues after uploading your files to Plesk, check the following common solutions.

## 1. "404 Not Found" on Refresh
**Problem**: You navigate to `/shop` or `/contact`, refresh the page, and get a 404 error from the server.
**Cause**: The server (Apache/Nginx) tries to find a file named `shop.html` or a folder `shop/`, but this is a Single Page Application where `index.html` handles all routes.
**Solution**: Ensure you have created the `.htaccess` file in your `httpdocs` directory as described in `DEPLOY_TO_PLESK.md`.

## 2. Images Not Loading
**Problem**: Images appear broken or don't load.
**Cause**: 
- Missing files in the upload.
- Wrong path references (e.g., local absolute paths).
**Solution**:
- Ensure the `_next` folder from the `out` directory was uploaded correctly.
- Check browser console (F12) for 404 errors on specific image files.

## 3. Database Connection Failed
**Problem**: Products don't load, looking at "Network" tab shows failed requests.
**Cause**: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are environment variables. In a static build, these are "baked in" at build time.
**Solution**: 
- Ensure your `.env.local` file was present and correct when you ran `npm run build` locally.
- If you change these keys, you must **re-build** (`npm run build`) and re-upload the files. You cannot change them on the server side for a static site.

## 4. "500 Internal Server Error"
**Problem**: The site doesn't load at all.
**Cause**: Likely a syntax error in your `.htaccess` or `web.config` file.
**Solution**: Rename `.htaccess` to `.htaccess_bak` to disable it and see if the site loads (at least the homepage). If it does, correct the `.htaccess` syntax.
