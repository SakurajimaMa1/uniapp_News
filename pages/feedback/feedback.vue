<template>
	<view>
		<view class="feedback-title">意见反馈：</view>
		<view class="feedback-content">
			<textarea class="feedback-textarea" v-model="content" placeholder="请输入您要反馈的问题"></textarea>
		</view>
		<view class="feedback-title">反馈图片：</view>
		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(item, index) in imageLists" :key="index">
				<view class="close-icon" @click="del(index)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<view v-if="imageLists.length < 5" class="feedback-image-item" @click="addImage">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		<button class="feedback-button" type="primary" @click="submit">提交反馈</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageLists: [],
				content: '',
			}
		},
		methods: {
			del(index) {
				this.imageLists.splice(index, 1)
			},
			addImage() {
				const count = 5 - this.imageLists.length
				uni.chooseImage({
					count:count,
					success:(res)=>{
						const tempfilepaths = res.tempFilePaths
						tempfilepaths.forEach((item, index)=>{
							if (index < count) {
								this.imageLists.push({
									url: item
								})
							}
						})
					}
				})
			},
			async submit() {
				let imagesPath = []
				let reg = /\/([^\/]*)$/
				uni.showLoading()
				for (let i = 0; i < this.imageLists.length; i++){
					let filePath = this.imageLists[i].url
					let fileName = JSON.stringify(filePath).match(reg)[0].slice(1, -1);
					filePath = await this.uploadFiles(filePath, fileName)
					imagesPath.push(filePath)
				}

				this.updateFeedback({
					content: this.content,
					feedbackImages: imagesPath
				})
			},
			async uploadFiles(filePath, fileName) {
				const result = await uniCloud.uploadFile({
					cloudPath: fileName,
					filePath: filePath
				})
				return result.fileID
			},
			updateFeedback({content,feedbackImages}) {
				this.$api.update_feedback({
					content,
					feedbackImages
				}).then((res)=> {
					uni.hideLoading()
					uni.showToast({
						title: "提交成功",
						icon: 'none'
					})
					setTimeout(()=>{
						uni.switchTab({
							url: '/pages/tabbar/my/my'
						})
					}, 2000)
					
				}).catch(()=>{
					uni.hideLoading()
					uni.showToast({
						title: "提交失败",
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.feedback-title {
		margin: 15px;
		margin-bottom: 0;
		font-size: 14px;
		color: #666;
	}
	.feedback-content {
		margin: 15px;
		padding: 10px;
		box-sizing: border-box;
		border: 1px #eee solid;
		.feedback-textarea {
			font-size: 12px;
			height: 100px;
			width: 100%;
		}
	}
	.feedback-image-box {
		display: flex;
		flex-wrap: wrap;
		padding: 10px;
		.feedback-image-item {
			position: relative;
			width: 33.3%;
			height: 0;
			padding-top: 33.3%;
			box-sizing: border-box;
			.close-icon {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 22px;
				height: 22px;
				border-radius: 50%;
				background-color: #ff5a5f;
				z-index: 2;
			}
			.image-box {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 5px;
				right: 5px;
				bottom: 5px;
				left: 5px;
				border: 1px #eee solid;
				border-radius: 5px;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.feedback-button {
		margin: 0 15px;
		background-color: $mk-base-color;
	}
</style>
