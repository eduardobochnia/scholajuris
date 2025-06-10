const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const backupDatabase = async () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(__dirname, `../backups/backup-${timestamp}.sql`);

  // Criar diretório de backups se não existir
  if (!fs.existsSync(path.join(__dirname, '../backups'))) {
    fs.mkdirSync(path.join(__dirname, '../backups'));
  }

  // Executar backup do PostgreSQL
  const command = `pg_dump ${process.env.DATABASE_URL} > ${backupPath}`;
  
  exec(command, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao executar backup: ${error}`);
      return;
    }

    // Upload para S3
    try {
      const fileContent = fs.readFileSync(backupPath);
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.AWS_BACKUP_BUCKET,
        Key: `backups/backup-${timestamp}.sql`,
        Body: fileContent,
      }));

      console.log(`Backup realizado com sucesso: backup-${timestamp}.sql`);
      
      // Remover arquivo local após upload
      fs.unlinkSync(backupPath);
    } catch (error) {
      console.error(`Erro ao fazer upload do backup: ${error}`);
    }
  });
};

// Executar backup
backupDatabase(); 