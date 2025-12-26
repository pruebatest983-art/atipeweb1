# How to Deploy to Plesk

Since we have generated a **Static Version** of the website, you don't need to install Node.js on your server. You can host it just like a classic PHP/HTML website.

## Steps to Upload

1.  **Locate the Build Folder**:
    After the build command completes, you will find a folder named `out` in your project directory:
    `c:\servicio_tecnico\atipeweb\out`

2.  **Access your Plesk File Manager**:
    - Log in to your Plesk control panel.
    - Go to **Files** or **File Manager**.
    - Navigate to the `httpdocs` directory (or the root directory of your domain).

3.  **Upload the Files**:
    - **Delete** the default `index.html` or placeholder files if they exist in `httpdocs`.
    - **Upload** all the **contents** of the `out` folder to `httpdocs`.
    - *Tip*: It is often faster to zip the contents of the `out` folder, upload the zip file, and then "Extract" it in Plesk.

## Important Notes

- **Database**: The site is currently using **Supabase** (external database) or **Mock Data** (local test data). It enables the "Shop" and "Admin" features to work without needing a local MySQL database on Plesk.
- **Forms**: If you want to connect contact forms to PHP scripts later, you can add `.php` files to the `httpdocs` folder and fetch them from the frontend, but currently, the site is designed to run as a Single Page Application (SPA) client-side.
- **Routing**: If you experience "404 Not Found" errors when refreshing pages (like `/shop` or `/contact`), you need to configure a `.htaccess` file to redirect all requests to `index.html`.

### Recommended .htaccess for Plesk
Create a file named `.htaccess` in your `httpdocs` folder with this content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```
