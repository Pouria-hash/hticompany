import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import HeaderTwo from './component/HeaderTwo';
import Footer from './component/Footer';
import PageNotFoundScreen from './screens/PageNotFoundScreen';
import LoginScreen from './screens/LoginScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import ProjectCreateNewScreen from './screens/ProjectCreateNewScreen';
import ProjectDetailScreen from './screens/ProjectDetailScreen';
import ProjectListScreen from './screens/ProjectListScreen';
import ProjectEditScreen from './screens/ProjectEditScreen';
import BlogScreen from './screens/BlogScreen';
import PostCreateNewScreen from './screens/PostCreateNewScreen';
import PostScreen from './screens/PostScreen';
import PostEditScreen from './screens/PostEditScreen';
import PostListScreen from './screens/PostListScreen';
import ProfileScreen from './screens/ProfileScreen';
import ContactScreen from './screens/ContactScreen';
import ReviewScreen from './screens/ReviewScreen';
import AboutUsScreen from './screens/AboutScreen';

function App() {
	return (
		<BrowserRouter>
			<HeaderTwo />
			<Switch>
				<Route path="/" component={HomeScreen} exact />
				<Route path="/register" component={RegisterScreen} />
				<Route path="/login" component={LoginScreen} />
				<Route path="/profile" component={ProfileScreen} />
				<Route path="/projects" component={ProjectsScreen} exact />
				<Route path="/projects/:id" component={ProjectDetailScreen} />
				<Route path="/blog" component={BlogScreen} exact />
				<Route path="/blog/post/:id" component={PostScreen} />
				<Route path="/admin/projects/new" component={ProjectCreateNewScreen} />
				<Route path="/admin/projects" component={ProjectListScreen} exact />
				<Route path="/admin/projects/:id/edit" component={ProjectEditScreen} />
				<Route path="/admin/posts" component={PostListScreen} exact />
				<Route path="/admin/posts/new" component={PostCreateNewScreen} />
				<Route path="/admin/posts/:id/edit" component={PostEditScreen} />
				<Route path="/admin/reviews" component={ReviewScreen} />
				<Route path="/contact" component={ContactScreen} />
				<Route path="/about" component={AboutUsScreen} />
				<Route path="*" component={PageNotFoundScreen} />
			</Switch>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
