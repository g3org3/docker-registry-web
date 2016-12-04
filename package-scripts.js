
const name = require('./package.json').name
const registry = 'registry.jorgeadolfo.com'
const tag = 'latest'
const version = require('./package.json').version

module.exports = {
  scripts: {
    default: 'node lib/index.js',
    test: 'mocha',
    lint: 'standard --verbose | snazzy',
    docker: {
      build: {
        all: 'nps d.b.l && nps d.b.v',
        latest: `docker build -f docker/Dockerfile -t ${registry}/${name}:latest . `,
        version: `docker build -f docker/Dockerfile -t ${registry}/${name}:${version} . `
      },
      push: {
        all: 'nps d.p.l && nps d.p.v',
        latest: `docker push ${registry}/${name}:${tag}`,
        version: `docker push ${registry}/${name}:${version}`
      },
      run: `docker run -it --rm -p 3000:3003 --name test-${name} ${registry}/${name}:${tag}`
    },
    deploy: "ansible-playbook -v deploy/update.yml",
    full: "nps d.b.a && nps d.p.a && nps de"
  }
};
