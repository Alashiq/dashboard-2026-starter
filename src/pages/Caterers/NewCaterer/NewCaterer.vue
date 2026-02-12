<template src="./NewCaterer.html"></template>

<script src="./NewCaterer.js"></script>

<style scoped>
input:checked + div {
  background-color: #5dc363; /* أخضر عند التفعيل */
}
input:checked + div + .dot {
  transform: translateX(100%);
  background-color: #fff;
}
</style>
