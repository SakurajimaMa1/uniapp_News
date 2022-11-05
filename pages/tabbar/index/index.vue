<template>
	<view class="content">
		<navbar></navbar>
		<tab :list="tabList"></tab>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				tabList: []
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			getLabel() {
				// console.log(this.$api);
				this.$api.get_label({
					name: 'get_label'
				}).then((res)=>{
					const {data} = res
					this.tabList = data
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
