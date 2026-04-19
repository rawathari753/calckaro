import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface ResultCardProps {
  title: string;
  results: Record<string, any>;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, results }) => (
  <Card sx={{
    mt: { xs: 2.5, sm: 4 },
    borderRadius: { xs: 2, sm: 3 },
    boxShadow: 2,
    bgcolor: 'rgba(245,247,255,0.95)',
    border: '1px solid #e3e8f0',
  }}>
    <CardContent sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 3 } }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: 17, sm: 20 } }}>{title}</Typography>
      <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
        {Object.entries(results).map(([key, value]) => (
          <li key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 15 }}>
            <span style={{ fontWeight: 500 }}>{key}</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default ResultCard;
