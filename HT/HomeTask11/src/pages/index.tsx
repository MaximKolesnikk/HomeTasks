import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getAllExhibits } from '../api/exhibitActions';
import { Box, Pagination, Typography } from '@mui/material';
import Post from '../components/Post';

interface HomeProps {
  posts: any[];
  currentPage: number;
  totalPages: number;
}

const Home: React.FC<HomeProps> = ({ posts, currentPage, totalPages }) => {
  return (
    <Box>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          image={post.imageUrl}
          description={post.description}
          isOwner={false}
          user={post.user}
          createdAt={post.createdAt}
          onDelete={() => { }}
          onViewComments={() => { }}
        />
      ))}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => {
          window.location.href = `/?page=${page}`;
        }}
        sx={{ display: 'flex', justifyContent: 'center', marginTop: 4, }}
      />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  console.log('Ку-ку');
  const page = context.query.page ? Number(context.query.page) : 1;
  const response = await getAllExhibits(page);

  return {
    props: {
      posts: response.data,
      currentPage: page,
      totalPages: response.lastPage,
    },
  };
};

export default Home;