<template>
  <Progress is-animate :percentage="60" />
  <br>
  <Progress is-animate :time="5000" status="success" :percentage="60" />
  <br>
  <Progress type="circle" :percentage="60" />
</template>
