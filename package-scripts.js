
const name = require('./package.json').name
const registry = 'registry.jorgeadolfo.com'
const tag = 'latest'

module.exports = {
  scripts: {
    default: 'node lib/index.js',
    test: 'mocha',
    lint: 'standard --verbose | snazzy',
    docker: {
      build: `docker build -f docker/Dockerfile -t ${registry}/${name}:${tag} . `,
      push: `docker push ${registry}/${name}:${tag}`,
      run: `docker run -it --rm -p 3000:3003 --name test-${name} ${registry}/${name}:${tag}`
    },
    deploy: "ansible-playbook -v deploy/update.yml",
    full: "nps d.b && nps d.p && nps de"
  }
};
