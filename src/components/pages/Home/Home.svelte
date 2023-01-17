<script lang="ts">
  import { location, querystring } from "svelte-spa-router";
  import MyComponent from "../../MyComponent/MyComponent.svelte";
  import Luna from "../../../assets/img/Luna.jpg";

</script>

<img src="{Luna}" alt="Luna">

<h1>Hello world!</h1>
<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
<p>
  This template is pre-configured with svlete-spa-router for routing.<br/>
  Visit the <a href="https://github.com/ItalyPaleAle/svelte-spa-router">documentation for the router</a> to learn more.
</p>
<p>
  <a href="#/lorem/2">Lorem ipsum</a>
</p>


<MyComponent />

<p>Olha a location: {$location}</p>
<p>Olha a query string: {$querystring}</p>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  img {
    width: min(90%, 40rem);
    border-radius: 50%;
  }
</style>
