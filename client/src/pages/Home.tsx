import { findEnvFiles } from "@apis/findEnvFiles";
import { getEnvFileContents } from "@apis/getEnvFileContents";
import { saveChangeEnvContent } from "@apis/saveChangeEnvContent";
import { PROJECT_NAME } from "@common/variables";
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [envPath, setEnvPath] = useState<string[]>([]);
  const [selectEnvPath, setSelectEnvPath] = useState<string | null>(null);
  const [envContents, setEnvContents] = useState<string | null>(null);
  const [originEnvContents, setOriginEnvContents] = useState<string | null>(
    null
  );

  useEffect(() => {
    handleFindEnvFiles();
  }, []);

  function handleOpenModal() {
    setOpenModal(true);
    setEnvContents(null);
  }

  function handleExit() {
    setOpenModal(false);
  }

  async function handleFindEnvFiles() {
    const { data } = await findEnvFiles();
    setEnvPath(data);
    setEnvContents(null);
  }

  async function handleEditorOpen(path: string) {
    const { data } = await getEnvFileContents(path);
    setSelectEnvPath(path);
    setEnvContents(data);
    setOriginEnvContents(data);
    setOpenModal(false);
  }

  function handleChangeEnvContents(e: ChangeEvent<HTMLInputElement>) {
    setEnvContents(e.target.value);
  }

  async function handleApplyEditContent() {
    const { data } = await saveChangeEnvContent(
      selectEnvPath as string,
      envContents as string
    );
    if (data) {
      setSelectEnvPath(null);
      setOriginEnvContents(null);
      setEnvContents(null);
      alert("저장되었습니다.");
    } else {
      alert("저장에 실패했습니다.");
    }
  }

  function handleCloseEditContent() {
    setSelectEnvPath(null);
    setEnvContents(null);
    setOriginEnvContents(null);
    setOpenModal(true);
  }

  return (
    <Stack alignItems='center' height='inherit'>
      <Box m='auto'>
        <Typography
          fontSize={18}
          fontWeight={700}
          gutterBottom
          align='center'
          sx={{ textTransform: "uppercase" }}>
          {PROJECT_NAME.replace("-", " ")}
        </Typography>
        <Stack gap={1}>
          <Button
            disabled={envPath.length === 0}
            variant='contained'
            onClick={handleOpenModal}
            fullWidth
            sx={{ minWidth: 136 }}>
            {envPath.length > 0 ? (
              <Typography>Env 목록 보기</Typography>
            ) : (
              <CircularProgress size={24} color='inherit' />
            )}
          </Button>
        </Stack>
        {envContents !== null && (
          <Paper
            sx={{
              zIndex: 500,
              p: 3,
              width: "70%",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}>
            <Typography fontSize={18} fontWeight={700} gutterBottom>
              수정 중인 파일: {selectEnvPath}
            </Typography>
            <TextField
              multiline
              fullWidth
              value={envContents}
              onChange={handleChangeEnvContents}
            />
            <Stack direction='row' justifyContent='flex-end' gap={2} mt={1}>
              <Button
                variant='contained'
                color='primary'
                onClick={handleApplyEditContent}>
                수정
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={handleCloseEditContent}>
                취소
              </Button>
            </Stack>
          </Paper>
        )}
        {openModal && (
          <Paper
            sx={{
              zIndex: 500,
              p: 3,
              width: "70%",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}>
            <Stack direction='row' justifyContent='space-between'>
              <Typography fontSize={18} fontWeight={700} gutterBottom>
                Env path
              </Typography>
              <Button variant='contained' color='error' onClick={handleExit}>
                &times;
              </Button>
            </Stack>

            {envPath.length > 0 && (
              <Stack mt={3}>
                <Typography fontSize={18} fontWeight={700}>
                  수정할 env파일 선택
                </Typography>
                <List>
                  {envPath.map((path) => (
                    <ListItemButton
                      key={path}
                      onClick={() => handleEditorOpen(path)}>
                      <ListItemText>{path}</ListItemText>
                    </ListItemButton>
                  ))}
                </List>
              </Stack>
            )}
          </Paper>
        )}
      </Box>
    </Stack>
  );
}

export default Home;
