#!/bin/bash
trap bashtrap INT


bashtrap()
{
    echo "Goodbye!"
}