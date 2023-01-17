<script lang="ts">
</script>

<h1>Component</h1>

<br>


<p>Env variables:</p>
<p data-testid="env-container">
  NODE_ENV:{process.env.NODE_ENV}<br>
  MY_ENV_VARIABLE:{process.env.MY_ENV_VARIABLE}<br>
</p>

<br>

<style lang="scss">
  $fs: 5rem;
  h1 {
    font-size: $fs;
    margin: 1rem;
  }
  ::selection {
    background-color: #ff3e00;
    color: white;
  }
</style>
