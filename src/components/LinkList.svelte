<script lang="ts">
  const links: {
    name: string;
    link: string;
    avatar: string;
    descr: string;
  }[] = [
    {
      name: "mem的小站",
      link: "https://mem.ac/",
      avatar:
        "https://mem.ac/static/a6cef06ac3267a5705afaaf9092d0c47/83805/avatar-8x.webp",
      descr: "可爱又强大的mem佬",
    },
    {
      name: "Pikalock的小窝",
      link: "https://pikalock.github.io/",
      avatar: "https://avatars.githubusercontent.com/u/136658723?v=4",
      descr: "Pikalock的小窝",
    },
    {
      name: "A999999's Blog",
      link: "https://blog.jerryhzy.top/",
      avatar:
        "https://blog.jerryhzy.top/wp-content/uploads/2024/07/Yamada_Ryo.jpg",
      descr: "魔法を信じでいだ !",
    },
    {
      name: "XSYangtuo",
      link: "http://xsyangtuo.top/",
      avatar: "http://xsyangtuo.top/img/icon.jpg",
      descr: "yhgg~",
    },
    {
      name: "fufu酱のNoteBook",
      link: "https://csfufu.life/",
      avatar:
        "https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F7e7f23f4-8e61-4799-8b2d-06b91b4f376b%2Fed9382cd-6a49-40d0-b713-5660057615da%2Fb_a601042a239ea5faa453a2381ff012d1.jpg?table=collection&id=fa29299c-740d-41c7-a77c-4bab712647f7&width=400",
      descr: "fufu酱🥰",
    },
    {
      name: "浅碎时光 の 小世界",
      link: "https://darstib.github.io/myworld/",
      avatar: "https://darstib.github.io/myworld/img/avatar.jpg",
      descr: "因光而遇，因遇而散，旅人即路人，光是遇见就已经很美好了",
    },
    {
      name: "DSC's Blog",
      link: "https://dicsec.github.io/",
      avatar: "https://dicsec.github.io/images/avatar.jpg",
      descr: "DSC的笔记库",
    },
    {
      name: "Hervey's Blog",
      link: "https://herveyb3b4.github.io",
      avatar: "https://q1.qlogo.cn/g?b=qq&nk=2963203299&s=100",
      descr: "ACMer in ZJUT",
    },
    {
      name: "Water_tomato",
      link: "https://www.watertomato.com/",
      avatar:
        "https://www.watertomato.com/wp-content/uploads/2021/02/%E5%A4%B4%E5%83%8F.jpg",
      descr: "月流华，岁遗沙，万物吴钩出玉匣",
    },
    {
      name: "Pipipi",
      link: "https://www.foreverhyx.top/",
      avatar:
        "https://foreverhyx.top/wp-content/uploads/2023/11/1700612379-1688993924999.jpg",
      descr: "Pipipi の Blog",
    },
    {
      name: "Vanadium的小屋",
      link: "https://z-vanadium.github.io/",
      avatar:
        "https://www.imageoss.com/images/2024/03/27/avatar84f10990023d148a.jpg",
      descr: "It's Vanadium's Blog.",
    },
    {
      name: "华零的blog",
      link: "https://hzeroyuke.github.io/my_blog/",
      avatar: "https://hzeroyuke.github.io/my_blog/assets/fav.jpg",
      descr: "我希望许下的愿望，一路生花",
    },
    {
      name: "xiu",
      link: "https://xiu-zju.me",
      avatar: "https://xiu-zju.me/static/img/avatar.png",
      descr: "xiu's space",
    },
    {
      name: "Hamilton",
      link: "https://hamilton2718.github.io/",
      avatar: "https://hamilton2718.github.io/img/avatar.jpg",
      descr: "Hamilton's Pluto",
    },
    {
      name: "秋月春风",
      link: "https://yukinoshitasherry.github.io/",
      avatar:
        "https://raw.githubusercontent.com/YukinoshitaSherry/qycf_picbed/main/img/头像.jpg",
      descr: "明月守灯寻长梦",
    },
    {
      name: "ffy",
      link: "https://ffy6511.github.io/",
      avatar: "https://ffy6511.github.io/img/avatar.svg",
      descr: "ffyの四次元口袋",
    },
  ].sort(() => Math.random() - 0.5);

  function handleError(e: Event) {
    (e.target as HTMLImageElement).src = '/images/akkarin.png';
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
  {#each links as item}
    <a 
      href={item.link}
      class="flex gap-4 rounded-lg hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)] p-4 hover:pl-6 transition-all"
    >
    <img 
      src={item.avatar} 
      alt={item.name} 
      class="rounded-full flex-0" 
      width={64} 
      height={64} 
      on:error={handleError}
    />

      <div class="flex flex-col w-full overflow-hidden text-ellipsis whitespace-nowrap flex-1">
        <div class="text-bold text-xl text-bold text-[var(--primary)]">
          {item.name}
        </div>
        <div class="text-md dark:text-neutral-50 transition" title={item.descr}>
          {item.descr}
        </div>
      </div>
    </a>
  {/each}
</div>