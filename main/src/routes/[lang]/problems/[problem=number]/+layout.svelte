<script lang='ts'>
    import { page } from '$app/stores';

    let baseName: string = '';
    let pageName: string = '';

    page.subscribe((record)=>{
        baseName = `/${record.params.lang}/problems/${record.params.problem}`;
        pageName = record.url.pathname.replace(baseName, "");
    });

</script>
<ul class="nav mb-2">
    <li class="nav-item">   
        <a class="nav-link {pageName == '' ? 'active':''}" href={baseName}>Умова</a>
    </li>
    <li class="nav-item">
        <a class="nav-link {pageName === '/send' ? 'active':''}" href="{baseName}/send">Надіслати</a>
    </li>
    <li class="nav-item">
        <a class="nav-link {pageName === '/my' ? 'active':''}" href="{baseName}/my">Мої розв'язки</a>
    </li>
</ul>

<slot />

<style>
    .nav .nav-link{
        padding-left: 0;
    }

    .active{
        color: var(--accent-color);
    }
</style>