<script setup>
import { ref } from 'vue'
import '../src/styles/root-vars.scss'
import BubbleComponent from '../src/components/BubbleComponent.vue'

const animate = ref(true)
const animateF = () => {
  animate.value = false
  setTimeout(() => animate.value = true, 500)
}
</script>

# Bubble

Bubble component

## Basic Usage:

```html
<BubbleComponent />
```

<BubbleComponent />

## With Background And Color:

```html
<BubbleComponent background="#302a5f" color="#ffff00" />
```

<BubbleComponent background="#302a5f" color="#ffff00" />

## With Animation:

```html
<BubbleComponent :animate="true" />
```

<BubbleComponent :animate="animate" />

<button class="button" :disbaled="!animate" @click="animateF">See Animation</button>  

## Attributes:
