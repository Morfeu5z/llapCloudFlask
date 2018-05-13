from static.tool.FileManager import FileManager
from subprocess import Popen, PIPE

class Controller(object):

    def __init__(self, path, *keys ):
        self.__PathToSystemCommand = path
        self.keys  = [str(x) for x in keys]

    @property
    def PathToSystemCommand(self) -> str:
        return self.__PathToSystemCommand

    @PathToSystemCommand.setter
    def PathToSystemCommand(self, path : str ):
        """
                PathToSystemCommand
        -----------------------------------------
        zbierania danych o pliku i podciąga
        META-informacje dla interpretacji w
        system dla liczenia przez PipeBuilder-a

        @Serhii Riznychuk
        """
        if(FileManager.testExistFile(path)):
            self.__PathToSystemCommand = path

    def verify(self, lambda_cmpr) -> bool:
        loadProcent = 0
        try:
            controllerProcess = Popen((self.__PathToSystemCommand), shell=True, stdout=PIPE)
            controllerProcess.wait()
            controllerProcess.communicate()
            if controllerProcess.returncode:
                raise IOError
            output = controllerProcess.communicate()
            loadProcent = output[1]
            print(loadProcent)
        except BrokenPipeError as message:
            print("Zjebaleś spok!... zjebaleś")
            print(message)
        except Exception as message:
            print(message)
        return True if lambda_cmpr(loadProcent) else False