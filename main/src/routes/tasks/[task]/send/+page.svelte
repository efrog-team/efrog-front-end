<script lang='ts'>
    import { enhance } from '$app/forms';

    const languages = [
        "Python 3 (3.10)",
        "C++ 17 (g++ 11.2)",
        "C 17 (gcc 11.2)"
    ];
</script>

<form class="mb-5 mt-2" action="./testing" method="post" >
    <div class="mb-3">
        <label for="language" class="form-label">Мова програмування</label>
        <select class="form-select" id="language" name="language">
            {#each languages as lang, i}
                <option value={lang} selected={i == 0}>{lang}</option>
            {/each}
          </select>
      </div>
        <div class="mb-3">
            <label for="solution" class="form-label">Код програми</label>
            <textarea name="solution" class="form-control" id="solution" rows="20"  required></textarea>
        </div>
        <div class="text-end mb-3 d-flex">
            <button type="submit" class="col-12 btn btn-accent">Надіслати розв'язок</button>
        </div>
</form>

<style>
    .form-control, .form-select{
        background-color: var(--color3);
        border-color: var(--color2);
        color: var(--font-color)
    }

    textarea{
        font-family: monospace;
    }
</style>