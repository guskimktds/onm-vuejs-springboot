<template>
   <div class="container">
	<ul class="tabs">
		<li class="tab-link current" data-tab="tab-1">에디터</li>
		<li class="tab-link" data-tab="tab-2">직접</li>

	</ul>
</div>
</template>

<script>
export default {
 
}
</script>

<style scoped>

.container{

	margin: 0 auto;
}



ul.tabs{
	margin: 0px;
	padding: 0px;
	list-style: none;
}
ul.tabs li{
	background: none;
	color: #222;
	display: inline-block;
	padding: 10px 15px;
	cursor: pointer;
}

ul.tabs li.current{
	background: #ededed;
	color: #222;
}

.tab-content{
	display: none;
	background: #ededed;
	padding: 15px;
}

.tab-content.current{
	display: inherit;
}
</style>