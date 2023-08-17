<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<!-- #ifndef MP-ALIPAY -->
			<view :style="{height: statusBarHeight + 'px'}"></view>
			<!-- #endif -->
			<!-- 导航栏 -->
			<view class="navbar-content" :class="{search: isSearch}" :style="{height: navBarHeight + 'px', width:windowWidth+'px'}" @click.stop="open">
				<view v-if="isSearch" class="navbar-content__search-icons" @click="back">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<view v-if="!isSearch" class="navbar-search">
					<!-- 非搜索页显示 -->
					<view class="navbar-search_icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-search_text">uni-app.vue</view>
			   	</view>
				<view v-else class="navbar-search">
					<!-- 搜索页显示 -->
					<input class="navbar-search_text" type="text" v-model="val" value="" @input="inputChange" placeholder="请输入要搜索的内容">
				</view>
			</view>
		</view>
		<view :style="{height: statusBarHeight + navBarHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: [String, Number],
				default:''
			},
			isSearch: {
				type: Boolean,
				default: false
			}
		},
		name:"navbar",
		data() {
			return {
				statusBarHeight: 20,
				navBarHeight: 45,
				windowWidth: 375,
				val: ''
			};
		},
		watch: {
			value(newVal) {
				this.val = newVal
			}
		},
		created(){
			const info = uni.getSystemInfoSync()
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			// #endif
			// #ifdef MP-ALIPAY
			this.statusBarHeight = 0
			// #endif
		},
		methods: {
			back() {
				uni.switchTab({
					url: '/pages/tabbar/index/index'
				})
			},
			open() {
				if (this.isSearch) return
				uni.navigateTo({
					url: "/pages/home-search/home-search"
				})
			},
			inputChange(e) {
				const { value } = e.detail
				this.$emit('input', value)
			}
		}
	}
</script>

<style lang="scss">
	.navbar {
		.navbar-fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;		
			width: 100%;
			background-color: $mk-base-color;
			.navbar-content {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 15px;
				height: 45px;
				box-sizing: border-box;
				.navbar-search {
					display: flex;
					align-items: center;
					padding: 0 10px;
					height: 30px;
					width: 100%;
					border-radius: 30px;
					background-color: #fff;
					.navbar-search_icon {
						margin-right: 10px;
					}
					.navbar-search_text {
						width: 100%;
						font-size: 14px;
						color: #999;
					}
				}
				&.search {
					padding-left: 0;
					.navbar-content__search-icons {
						margin-left: 10px;
						margin-right: 10px;
					}
					.navbar-search {
						border-radius: 5px;
					}
				}
			}
		}
	}
</style>