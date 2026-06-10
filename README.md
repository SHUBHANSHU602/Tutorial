# Python MQTT Client Template

A custom AsyncAPI Generator template that generates a Python MQTT client using the Paho MQTT library.

This project was created as part of learning and exploring AsyncAPI template development. The template reads an AsyncAPI document and generates Python code capable of publishing MQTT messages to topics defined in the specification.

---

## Features

- Generates Python MQTT client code from an AsyncAPI document
- Uses the Paho MQTT client library
- Supports MQTT protocol
- Generates publish functions dynamically from AsyncAPI operations
- Supports reusable template components
- Demonstrates React-based AsyncAPI template development

---

## Project Structure

```text
python-mqtt-client-template/
│
├── components/
│   └── TopicFunction.js
│
├── template/
│   └── index.js
│
├── test/
│   ├── fixtures/
│   │   └── asyncapi.yml
│   │
│   └── project/
│       └── test.py
│
├── package.json
└── README.md
```

---

## Prerequisites

Before running the project, install:

### Node.js

https://nodejs.org/

### AsyncAPI CLI

```bash
npm install -g @asyncapi/cli
```

### Python

https://www.python.org/

### Paho MQTT

```bash
pip install paho-mqtt==1.6.1
```

### Docker (Optional)

Used to verify MQTT messages through MQTT CLI.

https://www.docker.com/

---

## AsyncAPI Document

The template uses an AsyncAPI document located at:

```text
test/fixtures/asyncapi.yml
```

The specification defines:

- MQTT server configuration
- Channels (topics)
- Operations
- Message schemas

Example topics:

```text
temperature/dropped
temperature/risen
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd python-mqtt-client-template
```

Install dependencies:

```bash
npm install
```

---

## Generate Python Client

Run:

```bash
npm run test:generate
```

Generated output:

```text
test/project/client.py
```

---

## Run the Example

Execute:

```bash
npm test
```

Expected output:

```text
Temperature drop detected 49040460 sent to temperature/dropped
Temperature rise detected 49040460 sent to temperature/risen
Temperature drop detected 66943992 sent to temperature/dropped
Temperature rise detected 66943992 sent to temperature/risen
```

Press:

```text
Ctrl + C
```

to stop execution.

---

## How It Works

### AsyncAPI Specification

The AsyncAPI document defines:

```yaml
operations:
  temperatureDrop:
    action: receive

  temperatureRise:
    action: receive
```

### TopicFunction Component

The reusable component:

```js
TopicFunction.js
```

reads all operations marked with:

```yaml
action: receive
```

and generates Python methods automatically.

Generated output:

```python
def sendTemperatureDrop(self, id):
    topic = "temperature/dropped"
    self.client.publish(topic, id)

def sendTemperatureRise(self, id):
    topic = "temperature/risen"
    self.client.publish(topic, id)
```

---

## Template Architecture

```text
AsyncAPI Document
        │
        ▼
 AsyncAPI Parser
        │
        ▼
 React Template
        │
        ▼
 TopicFunction Component
        │
        ▼
 Generated Python Client
```

---

## Example Generated Client

```python
import paho.mqtt.client as mqtt

mqttBroker = "test.mosquitto.org"

class TemperatureServiceClient:

    def __init__(self):
        self.client = mqtt.Client()
        self.client.connect(mqttBroker)

    def sendTemperatureDrop(self, id):
        topic = "temperature/dropped"
        self.client.publish(topic, id)

    def sendTemperatureRise(self, id):
        topic = "temperature/risen"
        self.client.publish(topic, id)
```

---

## Testing MQTT Messages

Subscribe to a topic using MQTT CLI:

```bash
docker run hivemq/mqtt-cli sub -t temperature/dropped -h test.mosquitto.org
```

Or:

```bash
docker run hivemq/mqtt-cli sub -t temperature/risen -h test.mosquitto.org
```

Then run:

```bash
npm test
```

You should see published messages arriving in the subscriber terminal.

---

## Learning Objectives

This project demonstrates:

- AsyncAPI Template Development
- AsyncAPI Parser API usage
- AsyncAPI Generator React SDK
- Dynamic code generation
- Reusable template components
- MQTT messaging fundamentals

---

## License

MIT
