// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import BlogItem from '../BlogItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogList extends Component {
  state = {blogList: {}, isLoading: true}

  componentDidMount() {
    this.getBlogList()
  }

  getBlogList = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const formattedData = data.map(eachBlog => ({
      id: eachBlog.id,
      title: eachBlog.title,
      imageUrl: eachBlog.image_url,
      avatarUrl: eachBlog.avatar_url,
      author: eachBlog.author,
      topic: eachBlog.topic,
    }))
    this.setState({blogList: formattedData, isLoading: false})
  }

  render() {
    const {isLoading, blogList} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          blogList.map(eachBlog => (
            <BlogItem key={eachBlog.id} blogDetails={eachBlog} />
          ))
        )}
      </div>
    )
  }
}

export default BlogList
