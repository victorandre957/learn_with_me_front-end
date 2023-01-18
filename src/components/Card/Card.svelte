<script lang="ts">

import { isTruthy } from "../../helpers/truthy";

/**
 * The title for the card.
 * @type {string}
 */
export let title = "";

/**
 * Whether there should be a gray background around the body (default slot).
 * @type {boolean}
 */
export let bodySlotted = false;

/**
 * Returns true if there is something in the header slot, false otherwise.
 */
function hasHeaderSlot(): boolean {
  return isTruthy(($$slots as { header: unknown }).header);
}
</script>

<div class="card"
  class:with-header={title !== "" || hasHeaderSlot()}
  class:slotted={bodySlotted}
>
  {#if title !== "" || hasHeaderSlot()}
    <div class="card-header">
      {#if title !== ""}
        <p class="card-title">{title}</p>
      {/if}
      <!-- The slot for placing stuff next to the title. -->
      <slot name="header" />
    </div>
  {/if}
  <div
    class="card-body"
    class:slotted={bodySlotted}
    class:with-header={title !== "" || hasHeaderSlot()}
  >
    <!-- The body of the card. May be surrounded by a gray background -->
    <slot />
  </div>
</div>

<style lang="scss">
  @use "src/styles/variables" as v;

  .card {
    display: grid;
    grid: 1fr / 1fr;

    overflow: hidden;
    height: 100%;

    background: var(--card-background, white);
    border-radius: var(--card-border-radius, 0.75em);
    box-shadow: 0px 0px 4px 0px #00000012;
    border: var(--card-border, none);

    --padding: 1.5em;
    padding: var(--card-padding, var(--padding));

    &.slotted {
      --padding: 0.625em;
    }
    &.with-header {
      grid: auto 1fr / 1fr;
      padding-top: 0;
    }

    &-header {
      display: flex;
      align-items: center;

      padding: var(--card-padding-header, 0.9375em calc(1.5em - var(--padding)) 0.9375em);
    }
    &-title {
      font-weight: 600;
      font-size: 1.25rem;

      margin-top: 0.45em;
      margin-bottom: 0.25em;
      margin-right: 1em;
    }
    &-body {
      height: 100%;
      overflow: hidden;

      &.slotted {
        background: gray;
        border-radius: 0.75em;
        padding: 0.625em;
      }
    }
  }
</style>
