# fyrevm-web

FyreVM-Web is a web application platform for Inform 7 based Interactive Fiction stories. There is a standard template,
standard components, and a reference to the glulx-typescript engine. The platform relies on glulx-typescript, fyrevm web manager, fyrevm memory manager, reactjs, and semantic-ui as its core components.

## Getting started

### Requirements

To be installed by the user:

* [Inform 7](http://inform7.com/download/)
* [NodeJS/NPM](https://nodejs.org/en/download/)
* TypeScript

      npm install -g typescript

* [Git Client](https://git-scm.com/downloads)


Other items will get "pulled" from various git repositories, including:

* [glulx-typescript](https://github.com/thiloplanz/glulx-typescript)
* [reactjs](https://facebook.github.io/react/)

### Source code installation

You may wish to alter a template or create your own. In that case, you'll want to clone or fork the entire repository and make your changes.

* Clone FyreVM-Web

      git clone -g fyrevm-web

### Build the standard template

* npm install
* cd semantic; gulp buid; cd ..
* npm run build

### Run the standard template locally

* npm install
* cd semantic; gulp buid; cd ..
* npm start

### Creating your own template

* In the /fyrevm-web/ifpress/templates folder, create a new folder with your template name (e.g. threewindows)
* Copy the Standard template to your new folder and modify as needed.
