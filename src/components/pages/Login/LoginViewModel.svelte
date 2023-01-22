<script lang="ts">
  import { push } from "svelte-spa-router";
  import Login from "./Login.svelte";
  import { strapiApi, showToUserError } from "../../../helpers/api/index";

  async function validateAccess(ev: CustomEvent<{ email: string, password: string }>) {
    const { email, password } = ev.detail;

    const validateRes = await strapiApi.users.fetch();

    if (validateRes.dataType === "record") {
      return validateRes.data.filter(async (item) => {
        if (item.email === email && item.password === password) await push("/");
        return false;
      });
    }
    showToUserError(validateRes);
    return false;
  }

</script>

<Login on:submit={validateAccess} />

<style lang="scss">
</style>
