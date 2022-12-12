## How to release common-ui

* pull master locally
* update and fix dependencies
* run `yarn && yarn build`  to make sure the build is successful
* update browserslist  when necessary
* run `git status` to check that working space is clean


### Publish to npm

#### common-ui:

* `npm login` 
   - username: camunda-cloud
   - password: ask @pedesen

this writes an access token to ~/.npmrc:

`//registry.npmjs.org/:_authToken=<TOKEN>`

* run `yarn publish`
* enter new version
* run `git push`

#### common-ui-react:

* pull master locally
* manually bump dependenies and peerDependencies to common-ui in package.json
* ⚠️ don't commit, leaves changes staged
* run `yarn publish`
* enter new version
* run `git push`

### Publish to github packages

* add redirect to ~/.npmrc:

```
@camunda-cloud:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=<TOKEN>
```

to get the Github Token:
Github: Settings -> Developer Settings -> Personal access tokens -> Generate new token

* run `yarn publish`
* don't bump version again, keep current version

repeat for common-ui-react 


* comment out redirect in ~/.npmrc:
`#@camunda-cloud:registry=https://npm.pkg.github.com/`
