<template>
	<view>
		<!-- 基础卡 -->
		<view v-if="mode === 'base'" class="listcard">
			<view class="listcard-image">
				<image src="../../static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="listcard-content">
				<view class="listcard-content__title">
					<text>求七五五七都唔清楚就打车去武汉汉汉青蛙青蛙的爱的汉青蛙青蛙的爱的青蛙青蛙的爱的伤残督察vu吧v阿斯顿</text>
				</view>
				<view class="listcard-content__des">
					<view class="listcard-content__des-label">
						<view class="listcard-content__des-label-item">前端</view>
					</view>
					<view class="listcard-content__des-browse">120</view>
				</view>
			</view>
		</view>
		
		<!-- 多图模式 -->
		<view v-if="mode === 'column'" class="listcard mode-column">
			<view class="listcard-content">
				<view class="listcard-content__title">
					<text>求七五五七都唔清楚就打车去武汉汉汉青蛙青蛙的爱的汉青蛙青蛙的爱的青蛙青蛙的爱的伤残督察vu吧v阿斯顿</text>
				</view>
				<view class="listcard-image">
					<view v-for="item in 3" :key="item" class="listcard-image__item">
						<image src="../../static/logo.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="listcard-content__des">
					<view class="listcard-content__des-label">
						<view class="listcard-content__des-label-item">前端</view>
					</view>
					<view class="listcard-content__des-browse">120</view>
				</view>
			</view>
		</view>
		
		<!-- 大图模式 -->
		<view v-if="mode === 'image'" class="listcard mode-image">
			<view class="listcard-image">
				<image src="/static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="listcard-content">
				<view class="listcard-content__title">
					<text>求七五五七都唔清楚就打车去武汉汉汉青蛙青蛙的爱的汉青蛙青蛙的爱的青蛙青蛙的爱的伤残督察vu吧v阿斯顿</text>
				</view>
				
				<view class="listcard-content__des">
					<view class="listcard-content__des-label">
						<view class="listcard-content__des-label-item">前端</view>
					</view>
					<view class="listcard-content__des-browse">120</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"list-card",
		props: {
			mode: {
				type: String,
				default: "base"
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.listcard {
		display: flex;
		padding: 10px;
		margin: 10px;
		border: 5px;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
		box-sizing: border-box;
		.listcard-image {
			flex-shrink: 0;
			width: 60px;
			height: 60px;
			border-radius: 5px;
			overflow: hidden;
			image {
				height: 100%;
				width: 100%;
			}
		}
		.listcard-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			width: 100%;
			.listcard-content__title {
				font-size: 14px;
				color: #333;
				font-weight: 400;
				line-height: 1.2;
				text {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp:2;
					-webkit-box-orient:vertical;
				}
			}
			.listcard-content__des {
				display: flex;
				justify-content: space-between;
				font-size: 12px;
				.listcard-content__des-label {
					display: flex;
					.listcard-content__des-label-item {
						padding: 0 5px;
						margin-right: 5px;
						border-radius: 15px;
						color: $mk-base-color;
						border: 1px $mk-base-color solid;
					}
				}
				.listcard-content__des-browse {
					color: #999;
					line-height: 1.5;
				}
			}
		}
		
		&.mode-column {
			.listcard-content {
				width: 100%;
				padding-left: 0;
			}
			.listcard-image {
				display: flex;
				margin-top: 10px;
				width: 100%;
				height: 70px;
				.listcard-image__item {
					margin-left: 10px;
					width: 100%;
					border-radius: 5px;
					overflow: hidden;
					&:first-child {
						margin-left: 0;
					}
					image {
						width: 100%;
						height: 100%;
					}
				}
				
			}
			.listcard-content__des {
				margin-top: 10px;
			}
		}
		
		&.mode-image {
			flex-direction: column;
			.listcard-image {
				width: 100%;
				height: 100px;
			}
			.listcard-content {
				padding-left: 0;
				margin-top: 10px;
				.listcard-content__des {
					display: flex;
					align-items: center;
					margin-top: 10px;
				}
			}
		}
	}

</style>