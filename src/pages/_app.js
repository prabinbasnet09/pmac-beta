import '../styles/globals.css'
import Layout from '@/components/Layout'

const withLayout = (Component) => {
  return function WrappedComponent(props) {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    )
  }
}

export default function App({ Component, pageProps }) {
  const LayoutComponent = withLayout(Component);
  return <LayoutComponent {...pageProps} />
}
