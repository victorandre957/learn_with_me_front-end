<script lang="ts">
import Card from "./Card.svelte";

export let bodyHtml = "";
export let headerHtml = "";
</script>

<div class="wrapper">
  {#if headerHtml !== ""}
    <Card {...$$restProps}>
      {@html bodyHtml}

      <svelte:fragment slot="header">
        {@html headerHtml}
      </svelte:fragment>
    </Card>
  {:else}
    <Card {...$$restProps}>
      {@html bodyHtml}
    </Card>
  {/if}
</div>

<style>
  .wrapper {
    background-color: #e5e5e5;
    padding: 1em;
  }
</style>
