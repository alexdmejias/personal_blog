<?php snippet('header') ?>
<?php snippet('menu') ?>
<?php snippet('submenu') ?>

<section class="content wrap-narrow clearfix">

  <article>
    <header class="article-header">
    	<h1 class="h2 special"><a href="#"><?php echo html($page->title()) ?></a></h1>
    </header>
    <?php echo kirbytext($page->text()) ?>
  </article>

</section>

<?php snippet('footer') ?>