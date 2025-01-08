# Deployment Instructions (Render)

1. **Prerequisites**
   - GitHub account
   - Render account (free tier)
   - Git installed locally

2. **Database Setup**
   ```bash
   # Execute schema.sql locally first to test
   mysql -u root -p < schema.sql
   ```

3. **Repository Setup**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

4. **Render Configuration**
   1. Log into Render Dashboard
   2. Click "New +" → "Web Service"
   3. Connect GitHub repository
   4. Configure service:
      - Name: todo-api
      - Environment: Node
      - Build Command: `npm install`
      - Start Command: `node src/server.js`
      - Free Instance Type (keep default)

5. **Database Setup on Render**
   1. Click "New +" → "Private Service"
   2. Create new database
   3. Note connection details
   **Alternate Procedure (or skip if previous step is suited)**
   1. Headover to https://www.freemysqlhosting.net/
   2. Configure your MySQL server instance
   3. Obtain the credentials and head back to Render
   4. While creating your service, specify the credentials in the environment variables

6. **Environment Variables**
   Add to Render dashboard:
   ```
   PORT=3000
   DB_HOST=<render-mysql-host>
   DB_USER=<render-mysql-user>
   DB_PASSWORD=<render-mysql-password>
   DB_NAME=<render-mysql-database>
   ```

7. **Deploy**
   1. Click "Manual Deploy" → "Deploy latest commit"
   2. Wait for deployment (3-5 minutes)
   3. Access via provided .onrender.com URL

8. **Verify Deployment**
   ```bash
   curl https://your-app.onrender.com/todos
   ```

9. **Database Migration**
   ```bash
   mysql -h <render-mysql-host> -u <user> -p<password> < schema.sql
   ```

**Note**: Free tier limitations:
- Spins down after 15 minutes of inactivity
- 750 hours/month included
- Automatic HTTPS/SSL included