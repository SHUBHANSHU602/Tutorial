'use strict';

require('source-map-support/register');
var generatorReactSdk = require('@asyncapi/generator-react-sdk');
var jsxRuntime = require('C:/Users/SHUBHANSHU/AppData/Local/nvm/v24.11.0/node_modules/@asyncapi/cli/node_modules/@asyncapi/generator/node_modules/react/cjs/react-jsx-runtime.production.min.js');

function TopicFunction({
  operations
}) {
  const topicsDetails = getTopics(operations);
  let functions = '';
  topicsDetails.forEach(t => {
    functions += `def send${t.name}(self, id):
        topic = "${t.topic}"
        self.client.publish(topic, id)\n`;
  });
  return functions;
}
function getTopics(operations) {
  let topicsDetails = [];
  operations.forEach(op => {
    const channels = op.channels().all();
    if (!channels.length) return;
    const channel = channels[0];
    const operationId = op.operationId() || op.id();
    topicsDetails.push({
      name: operationId.charAt(0).toUpperCase() + operationId.slice(1),
      topic: channel.address()
    });
  });
  return topicsDetails;
}

function index ({
  asyncapi,
  params
}) {
  return /*#__PURE__*/jsxRuntime.jsxs(generatorReactSdk.File, {
    name: "client.py",
    children: [/*#__PURE__*/jsxRuntime.jsx(generatorReactSdk.Text, {
      newLines: 2,
      children: "import paho.mqtt.client as mqtt"
    }), /*#__PURE__*/jsxRuntime.jsxs(generatorReactSdk.Text, {
      newLines: 2,
      children: ["mqttBroker = \"", asyncapi.servers().get(params.server).host(), "\""]
    }), /*#__PURE__*/jsxRuntime.jsxs(generatorReactSdk.Text, {
      newLines: 2,
      children: ["class ", asyncapi.info().title().replaceAll(' ', ''), "Client:"]
    }), /*#__PURE__*/jsxRuntime.jsx(generatorReactSdk.Text, {
      indent: 2,
      newLines: 2,
      children: `def __init__(self):
            self.client = mqtt.Client()
            self.client.connect(mqttBroker)`
    }), /*#__PURE__*/jsxRuntime.jsx(generatorReactSdk.Text, {
      indent: 2,
      newLines: 2,
      children: /*#__PURE__*/jsxRuntime.jsx(TopicFunction, {
        operations: asyncapi.operations().filterByReceive()
      })
    })]
  });
}

module.exports = index;
//# sourceMappingURL=index.js.map
