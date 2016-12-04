
const name = require('./package.json').name
const version = require('./package.json').version
const registry = 'registry.jorgeadolfo.com'
const image = `${registry}/${name}`

module.exports = {
  scripts: {
    default: 'node lib/index.js',
    test: 'mocha',
    lint: 'standard --verbose | snazzy',
    docker: {
      build: {
        all: 'nps d.b.l && nps d.b.v',
        latest: `docker build -f docker/Dockerfile -t ${image}:latest . `,
        version: `docker build -f docker/Dockerfile -t ${image}:${version} . `
      },
      push: {
        all: 'nps d.p.l && nps d.p.v',
        latest: `docker push ${image}:latest`,
        version: `docker push ${image}:${version}`
      },
      run: `docker run -it --rm -p 3003:3003 --name test-${name} ${image}:latest`,
      rollback: {
        set: `docker tag ${image}:${version} ${image}:rollback`,
        change: `docker tag ${image}:rollback ${image}:latest`
      }
    },
    deploy: "ansible-playbook -v deploy/update.yml",
    rollback: "nps d.r.c && nps de",
    full: "nps d.b.a && nps d.p.a && nps de"
  }
};
