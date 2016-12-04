
const name = require('./package.json').name
const registry = 'registry.jorgeadolfo.com'
const tag = 'latest'

module.exports = {
  scripts: {
    default: 'node lib/index.js',
    test: 'mocha',
    docker: {
      build: `docker build -t ${registry}/${name}:${tag} . -f docker/Dockerfile`,
      push: `docker push ${registry}/${name}:${tag}`,
      run: `docker run -it --rm -p 3000:3003 --name test-${name} ${registry}/${name}:${tag}`
    },
    deploy: "ansible-playbook -v deploy/update.yml"
  }
};
