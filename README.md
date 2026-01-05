# Course Management Admin

LMS (Learning Management System) admin app

A demo app running multiple SPA frameworks against a .net web server.
The apps simulate basic CRUD operations and relations in different SPA frameworks.

## Running Server

### Installing dotnet

- Linux:
```bash
sudo apt-get install dotnet10
```

- Windows:
```bash
winget install Microsoft.DotNet.SDK.10
```

- Mac:
```bash
curl -fsSL https://dot.net/v1/dotnet-install.sh | bash -s -- --channel 10.0
```

### Run web api (cross-platform)
```bash
dotnet run --project "src/Dotnet Server/LMS.WebAPI"
```


## Running Angular Client App

### Installation

- Install [Node.js (v20.19.0 or greater)](https://nodejs.org/en/download)

### Run Client

```bash
cd src/Angular/LMS.ClientApp
npm i
ng serve
```


## Running React Client App

### Installation

- Install  [Node.js (v22 or greater)](https://nodejs.org/en/download)

### Run Client

```bash
cd src/React/LMS.ClientApp
npm i
npm run dev
```

