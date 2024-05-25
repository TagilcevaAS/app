import { Avatar, Button, Card, Chip } from '@mui/material';
import { useAuth } from '../../providers/useAuth';
import { signOut } from 'firebase/auth';

const User = () => {
    const { user, ga } = useAuth()

    return (
        <Card
            variant='outlined'
            sx={{
                padding: 2,
                backgroundColor: '#F5DEB3',
                border: 'none',
                borderRadius: 3,
                marginBottom: 2,
            }}
        >
            <Chip
                avatar={<Avatar alt='' src={user?.avatar} />}
                label={user?.name || 'NoName'}
                variant='outlined'
                sx={{display:'flex', marginBottom: 2}}
            />
            <Button variant='outlined' onClick={() => signOut(ga)}>
                Exit
                </Button>
        </Card>
    )
}

export default User