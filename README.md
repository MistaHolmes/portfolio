
# Next.js Portfolio

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## Docker Setup

This project includes a **Dockerfile** for easy containerization. To run the application in a Docker container, follow these steps:

### 1. Build the Docker image:
```bash
docker build -t next-portfolio .
```

### 2. Run the container:
```bash
docker run -p 3000:3000 next-portfolio
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Contributing

We welcome contributions! If you'd like to contribute to the project, please follow these steps:

1. **Fork the repository**:
   - If you don't have write access, click the **Fork** button at the top right of this GitHub page to fork the repo to your GitHub account.

2. **Clone the forked repository**:
   - Clone your fork to your local machine:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

3. **Create a new branch**:
   - It's recommended to create a new branch from `master` for your work:
   ```bash
   git checkout master
   git pull origin master
   git checkout -b your-feature-branch
   ```

4. **Make your changes**:
   - Edit the files to implement your changes.

5. **Commit your changes**:
   - After editing, stage and commit your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

6. **Push your changes**:
   - Push your changes to your fork:
   ```bash
   git push origin your-feature-branch
   ```

7. **Create a Pull Request (PR)**:
   - Go to your fork on GitHub and click on the "New Pull Request" button.
   - Select `master` as the base branch and your `feature-branch` as the compare branch.
   - Provide a detailed description of the changes you made in the PR.

> **Note**: The `master` branch is protected, meaning **direct pushes to `master` are not allowed**. You must create a pull request for any changes to be merged into `master`.

8. **Review and Merge**:
   - Once your PR is reviewed and approved, it will be merged into the `master` branch by a maintainer.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
