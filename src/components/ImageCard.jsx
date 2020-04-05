import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

export const ImageCard = ({ label, src }) => <Card>
    <CardContent>
        <Typography color="textSecondary" gutterBottom>
            {label}
        </Typography>
        <img src={src} />
    </CardContent>
</Card>