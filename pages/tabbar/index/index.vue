<template>
	<view class="home">
		<navbar></navbar>
		<tab :list="tabList" @tab='tab'></tab>
		<view class="home-list">
			<list :tab="tabList"></list>
		</view>
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
			tab({data, index}) {
				console.log(data, index);
			},
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
	page {
		height: 100%;
		display: flex;
	}
	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		.home-list {
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
