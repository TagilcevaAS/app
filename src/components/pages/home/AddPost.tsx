import { Alert, Box, TextField } from '@mui/material';
import React, { FC, KeyboardEvent, useState } from 'react';
import { useAuth } from '../../providers/useAuth';
import { addDoc, collection } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

const AddPost: FC = () => {
    const [content, setContent] = useState('');
    const { user, db } = useAuth();
    const [error, setError] = useState('');

    const addPostHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && user) {
            try {
                await addDoc(collection(db, 'posts'), {
                    author: user,
                    content,
                    createdAt: Timestamp.now()
                });
            } catch (error: any) {
                setError(error);
            }
            setContent('');
        }
    };

    return (
        <>
            {error && (
                <Alert severity='error' style={{ marginBottom: 20 }}>
                    {error}
                </Alert>
            )}
            <Box>
                <TextField
                    label='Написать статью'
                    variant='outlined'
                    InputProps={{
                        sx: { borderRadius: '25px', bgcolor: '#F5DEB3' }
                    }}
                    sx={{
                        width: '100%'
                    }}
                    onKeyPress={addPostHandler}
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />
            </Box>
        </>
    );
};

export default AddPost;