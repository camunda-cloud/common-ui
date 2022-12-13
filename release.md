## How to release common-ui

* pull master locally
* merge any dependabot PRs and fix problems if necessary
* ⚠️ don't bump the `common-ui` version in package.json, this will be done automatically later during the publish step
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

* make sure a potential redirect to github packages is commented out in your ~/.npmrc file:
   - `#@camunda-cloud:registry=https://npm.pkg.github.com/`
* run `yarn publish`
* enter new version
* run `git push`

#### common-ui-react:

* pull master locally
* manually bump dependencies and peerDependencies to common-ui in package.json
* ⚠️ don't commit, leave changes staged
* run `yarn publish`
* enter new version
* run `git push`

### Publish to github packages

* add redirect to ~/.npmrc:

```
@camunda-cloud:registry=https://npm.pkg.github.com/
```

to get the Github Token:
Github: Settings -> Developer Settings -> Personal access tokens -> Generate new token

#### common-ui:

* run `yarn publish`
* don't bump version again, keep current version

#### common-ui-react:

* run `yarn publish`
* don't bump version again, keep current version

#### Prepare for a future release

* comment out redirect in ~/.npmrc:
`#@camunda-cloud:registry=https://npm.pkg.github.com/`
