# ExcaliHub
<img src="https://github.com/user-attachments/assets/89e2ede0-a8e6-4051-80a0-cc34604f4697" alt="Excalihub" style="width:600px;"/>

Excalihub is a platform for creating and sharing Excalidraw drawings. You can create, save, and share multiple drawings for free.

You can checkout the live app at https://excalihub.dev/

## Getting Started

To get started with ExcaliHub, follow these steps:

1. Clone the repository to your local machine:
```bash
git clone https://github.com/NabilNYMansour/excalihub
```
2. Navigate to the project directory:
```bash
cd excalihub
```
3. Install the dependencies:
```bash
npm install
```
4. Create a [Clerk](https://clerk.com/) account, generate a private and public key, and place them in a new file called `.env.local`. You can see `.env.example` for the correct format.
5. To create a local db run:
```bash
npm run drizzle:generate
npm run drizzle:migrate
```
5. Finally, to start the app, run:
```bash
npm start
```

## Purpose

I find Excalidraw useful but the free version doesn't let you have multiple saved drawings. So I thought I could make that myself.

## License

ExcaliHub is licensed under the [MIT License](LICENSE).
