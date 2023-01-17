### Required Plugins
- EsLint (Install him on your code editor to follow the project format rules)
- EditorConfig

## Running the app

### Required

1. Install the [asdf](https://asdf-vm.com/).

2. Install the [asdf node plugin](https://github.com/asdf-vm/asdf-nodejs).

3. Install the node with asdf:
```sh
asdf install
npm install --global yarn
```
### Running

1. Install the node packages:

```sh
yarn install
```

```sh
yarn dev   # live reloading mode
yarn build # generate production build
yarn start # serve the production build
yarn test  # run jest tests and snapshot tests
yarn storybook # run the storybook server
```
## Running the app in docker

### Requirements

We will develop inside a container with vscode, so you will need:

1. Instal `docker`
2. If in windows install `WSL2`
3. Install the required plugins

### How to run

1. Copy `./.env.example` to `./.env`
2. Execute `docker-compose down --volumes --remove-orphans`
3. Run `docker-compose run svelte bash`
4. Inside the container run:
    ```
    yarn install
    ```
    next you can run any of these commands:
    ```
    yarn dev   # live reloading mode
    yarn build # generate production build
    yarn start # serve the production build
    yarn test  # run jest tests and snapshot tests
    yarn storybook # run the storybook server
    ```
