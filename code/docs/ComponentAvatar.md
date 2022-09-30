<script setup>
import { ref } from 'vue'
import Avatar from '../src/components/AvatarComponent.vue'

const animate = ref(false)
const animateF = () => {
  animate.value = false
  setTimeout(() => animate.value = true, 500)
}
</script>

# Avatar

Avatar component

## Basic Usage:

```html
<Avatar width="100px" height="100px"/>
```

<Avatar width="100px" height="100px"/>

## With Animation:

```html
<Avatar width="100px" height="100px" :animate="true"/>
```

<Avatar width="100px" height="100px" :animate="animate"/>

<button class="button" :disbaled="!animate" @click="animateF">See Animation</button>  

## Attributes:
