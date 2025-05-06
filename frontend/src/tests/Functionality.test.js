import Post from "../components/Post";
import PostList from "../components/PostList";
import {render, screen, waitFor} from "@testing-library/react";
import { getPosts } from "../APIController";

jest.mock('../APIController', () => ({
    getPosts: jest.fn(),
}));

describe("Functionality tests", () => {
    it("renders all posts correctly", async () => {

        const mockPosts = [
            { id: 1, title: 'Post 1', content: 'Content 1', created: '2025-05-06T12:00:00Z' },
            { id: 2, title: 'Post 2', content: 'Content 2', created: '2025-05-05T12:00:00Z' },
        ];
      
        getPosts.mockResolvedValue(mockPosts);

        render(<PostList/>);

        await waitFor(() => {
            expect(getPosts).toHaveBeenCalledTimes(1);
        })
    });
});